import React, { Component, PropTypes } from 'react';
import getCaretCoordinates from 'textarea-caret';

import Suggestions from './Suggestions';
import { getEmojiMatches } from './utils/emojis';

// Keycodes
const TAB = 9;
const ENTER = 13;
const ESCAPE = 27;
const UP = 38;
const DOWN = 40;

const SUGGESTIONS_TOP_OFFSET = 20;
const DEFAULT_ROWS = 10;
const DEFAULT_SUGGESTIONS_LIMIT = 5;

export const initialState = {
  leftIndex: -1,
  caretPosition: -1,
  showSuggestions: false,
  query: null,
  suggestionsPosition: {
    top: 0,
    left: 0,
  },
};

class EmojiInput extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.resetState = this.resetState.bind(this);
  }

  onChange(value) {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  getValue() {
    return this.textComponent.value;
  }

  resetState() {
    this.setState(initialState);
  }

  render() {
    let suggestions = [];
    if (this.state.showSuggestions && this.state.query) {
      suggestions = getEmojiMatches(this.state.query)
                      .slice(0, this.props.suggestionsLimit)
                      .map((emoji) => {
                        return {
                          value: emoji.character,
                          keyword: emoji.keyword,
                          label: (<span>{emoji.character} &nbsp; {emoji.keyword}</span>),
                        };
                      });
    }

    const valueProps = {};
    if (this.props.value) {
      valueProps.value = this.props.value;
    }
    if (this.props.defaultValue) {
      valueProps.defaultValue = this.props.defaultValue;
    }

    const TextComponent = this.props.input ? 'input' : 'textarea';

    return (
      <div className={`ei-container ${this.props.className || ''}`}>
        <TextComponent
          className="ei-text-component"
          rows={this.props.rows}
          ref={(textComponent) => { this.textComponent = textComponent; }}
          {...valueProps}
          onChange={(event) => {
            this.onChange(event.target.value);
          }}
          onClick={this.resetState}
          onKeyDown={(event) => {
            switch (event.keyCode) {
              case UP:
              case DOWN:
                if (this.suggestions) {
                  this.suggestions.traverseSuggestions(event.keyCode === DOWN);
                  event.preventDefault(); // Prevent caret movement.
                }
                return;
              case TAB:
              case ENTER:
                if (this.suggestions) {
                  this.suggestions.selectSuggestion();
                  event.preventDefault(); // Prevent caret movement.
                }
                return;
              case ESCAPE:
                this.resetState();
                break;
              default:
                break;
            }
          }}
          onInput={() => {
            const textComponent = this.textComponent;

            const caretPosition = textComponent.selectionStart;
            let leftIndex = caretPosition;
            // Find left word boundary containing the caret.
            const value = textComponent.value;
            while (leftIndex > 0) {
              leftIndex -= 1;
              if (/\s/.test(value[leftIndex])) {
                leftIndex += 1;
                break;
              }
            }
            // Extract word to match with emoji shortnames.
            const query = value.substring(leftIndex, caretPosition);

            const newState = {
              leftIndex,
              caretPosition,
              showSuggestions: false,
            };

            if (query.length > 1 &&
              query[0] === ':' &&
              query[1] !== ':' /* Prevent `::` from matching */) {
              newState.showSuggestions = true;
              newState.query = query.substring(1);
            }

            if (!this.state.showSuggestions && newState.showSuggestions) {
              const { top, left } = getCaretCoordinates(textComponent, textComponent.selectionEnd);
              newState.suggestionsPosition = {
                top: top + SUGGESTIONS_TOP_OFFSET,
                left,
              };
            }
            this.setState(newState);
          }}
        />
        {this.state.showSuggestions && suggestions.length > 0 &&
          <Suggestions
            style={this.state.suggestionsPosition}
            ref={(sug) => { this.suggestions = sug; }}
            options={suggestions}
            onSelect={(option) => {
              const text = this.textComponent.value;
              let value = option.value;
              if (this.props.shortname) {
                value = option.keyword;
              }

              const beforeQuery = text.substring(0, this.state.leftIndex);
              const afterQuery = text.substring(this.state.caretPosition, text.length);
              const newText = `${beforeQuery}${value} ${afterQuery}`;
              this.textComponent.value = newText;
              this.onChange(newText);

              // In case the focus was lost due to clicking of the suggestions.
              this.textComponent.focus();

              // Set caret to after the replaced query.
              const newCaretPosition = this.state.leftIndex + value.length + 1;
              this.textComponent.setSelectionRange(newCaretPosition, newCaretPosition);
              this.resetState();
            }}
          />
        }
      </div>
    );
  }
}

EmojiInput.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  input: PropTypes.bool,
  shortname: PropTypes.bool,
  rows: PropTypes.number,
  suggestionsLimit: PropTypes.number,
};

EmojiInput.defaultProps = {
  className: '',
  defaultValue: '',
  value: '',
  onChange: () => {},
  input: false,
  shortname: false,
  rows: DEFAULT_ROWS,
  suggestionsLimit: DEFAULT_SUGGESTIONS_LIMIT,
};

export default EmojiInput;
