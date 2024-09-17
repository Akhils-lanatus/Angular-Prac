import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-arithmetic',
  standalone: true,
  template: ` <div class="tw-relative">
    <input
      type="text"
      [formControl]="expression"
      class="form-control"
      (mousedown)="showDropdown()"
      (keydown)="onKeydown($event)"
      (blur)="onBlur($event)"
      #expressionInput
    />
    <div class="dropdown tw-absolute" (mousedown)="preventBlur($event)">
      @for (item of inputColumn; track $index) {
      <button
        class="inputColumnSelect"
        (click)="selectValue(item.value, expressionInput)"
      >
        {{ item.label }}
      </button>
      }
    </div>
    @if (validationMessage && !isValidExpression) {
    <div class="error tw-mb-2 tw-absolute tw-text-red-500">
      {{ validationMessage }}
    </div>
    }
  </div>`,
  styles: [
    `
      .dropdown {
        background-color: #fff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1),
          /* Y-axis shadow */ 0 1px 3px rgba(0, 0, 0, 0.08); /* Smaller, more subtle shadow */
        border-radius: 0.25rem;
        width: 100%;
        background: #fff;
        z-index: 100;
        max-height: 200px;
        overflow-y: auto;
      }

      .dropdown button {
        width: 100%;
        display: block;
        background: #fff;
        text-align: left;
        outline: none;
        border: none;
      }

      .dropdown button:hover {
        background: #000;
        color: #fff;
      }

      .inputColumnSelect {
        padding: 0.125rem 0.3125rem;
        cursor: pointer;
        font-size: 0.75rem;
        border-bottom: 1px solid var(--border-main);
      }

      .condition-builder {
        padding: 20px;
      }

      .error {
        font-size: 0.625rem;
        line-height: 1rem;
      }
    `,
  ],
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ParentFormComponent),
      multi: true,
    },
  ],
})
export class ParentFormComponent implements OnInit, ControlValueAccessor {
  @Input() inputExpression: string | null | undefined = null;
  @Input() inputColumn: {
    label: string;
    value: string | number;
    checked?: boolean;
    key?: number;
  }[] = [
    { label: 'Akhil', value: 'ak', checked: false, key: 9 },
    { label: 'Kevish', value: 'kt', checked: true, key: 10 },
    { label: 'Sarthak', value: 'ss', checked: true, key: 1 },
  ];
  @Output() changeEvent = new EventEmitter();

  //inputColumn = inputColumns;

  dropdownVisible: boolean = false;
  isValidExpression: boolean = false;
  validationMessage: string = '';
  expression = new FormControl();

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private cdr: ChangeDetectorRef) {}
  writeValue(value: string): void {
    this.expression.setValue(value);
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.expression.disable();
    } else {
      this.expression.enable();
    }
  }

  ngOnInit(): void {
    this.expression.setValue(this.inputExpression);
  }

  isMathExpression(str: string) {
    try {
      const arithmeticRegex = /^[\d\s()+\-*/.]+$/;
      if (arithmeticRegex.test(str)) {
        const temp = window.eval(str);
        return temp && temp !== '' && !isNaN(temp);
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  showDropdown(): void {
    this.dropdownVisible = true;
  }

  hideDropdown(): void {
    setTimeout(() => {
      this.dropdownVisible = false;
    }, 200);
  }

  onBlur(event: FocusEvent): void {
    this.hideDropdown(); // Hide dropdown on blur
    const input = event.target as HTMLInputElement;
    this.validateExpression(input.value); // Validate expression on blur
    if (this.isValidExpression) {
      this.onChange(input.value);
      this.changeEvent.emit({
        value: input.value,
        isValid: this.isValidExpression,
      });
    } else {
      this.onChange('');
      this.changeEvent.emit({
        value: '',
        isValid: this.isValidExpression,
      });
    }
    this.onTouched();
  }

  selectValue(value: string | number, inputElement: HTMLInputElement): void {
    // Convert the value to a string
    const stringValue = String(value);
    // Define the prefix
    const prefix = '';
    // Initialize the validation message
    this.validationMessage = '';
    // Get the current cursor position
    const start = inputElement.selectionStart || 0;
    const end = inputElement.selectionEnd || 0;
    // Get the current value of the input
    const currentValue = this.expression.value || '';

    // Create the new value with the prefix and inserted value
    const newValue =
      currentValue.substring(0, start) +
      prefix +
      stringValue +
      currentValue.substring(end);

    // Update the form control with the new value
    this.expression.setValue(newValue);
    this.onChange(newValue);

    // Use Angular's change detection to update the DOM
    this.cdr.detectChanges();

    // Move the cursor to the end of the inserted value
    setTimeout(() => {
      inputElement.setSelectionRange(
        start + prefix.length + stringValue.length,
        start + prefix.length + stringValue.length
      );
      inputElement.focus();
    }, 0);

    // Hide the dropdown if applicable
    this.dropdownVisible = false;
  }

  onKeydown(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const cursorPosition = input.selectionStart;
    const value = input.value;
    if (cursorPosition) {
      if (event.key === 'Backspace' && cursorPosition > 0) {
        // Check for 's' prefix before the current position
        const beforeCursor = value.substring(0, cursorPosition);
        const afterCursor = value.substring(cursorPosition);

        // Find the last term with 's' prefix before the cursor
        const match = beforeCursor.match(/s\d+$/);
        if (match) {
          event.preventDefault(); // Prevent the default backspace action
          const newValue =
            beforeCursor.substring(0, beforeCursor.length - match[0].length) +
            afterCursor;
          input.value = newValue;
          this.expression.setValue(newValue);
          this.onChange(newValue);
          // Set the cursor position
          setTimeout(() => {
            input.selectionStart = input.selectionEnd =
              cursorPosition - match[0].length;
          }, 0);
        }
      }
    }
  }

  preventBlur(event: MouseEvent): void {
    event.preventDefault();
  }

  validateExpression(expression: string): void {
    const replacedExpression = expression.replace(/s(\d+)/g, (match, p1) => p1);

    // Check if the replaced expression is a valid arithmetic expression
    const isValid =
      this.isMathExpression(replacedExpression) &&
      this.hasValidOperators(expression);
    this.isValidExpression = isValid;
    this.validationMessage = isValid
      ? 'The expression is valid.'
      : 'The expression is invalid.';
  }

  protected hasValidOperators(expression: string): boolean {
    // Regex to ensure no consecutive variables without operators

    // eslint-disable-next-line no-useless-escape
    const regex = /s\d+(?!\s*[\+\-\*\/\^%])\s*s\d+/;
    return !regex.test(expression);
  }
}
