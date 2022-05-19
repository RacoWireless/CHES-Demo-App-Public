import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Column } from 'src/app/models/model';

@Component({
  selector: 'app-global-list-filter',
  templateUrl: './global-list-filter.component.html',
  styleUrls: ['./global-list-filter.component.scss'],
})
export class GlobalListFilterComponent implements OnInit, OnDestroy {
  @Input()
  set columns(value: Column[]) {
    this._columns = [...this._columns, ...value];
  }

  get columns() {
    return this._columns;
  }

  @Output() valueChanges = new EventEmitter();

  _columns: Column[] = [
    {
      field: 'any',
      header: 'Any',
      is_filter_enabled: true,
    },
  ];

  form: FormGroup;
  valueChangesSubscription: Subscription;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      search_by: [this.columns[0].field, Validators.required],
      search_value: [''],
    });
  }

  ngOnInit(): void {
    this.valueChangesSubscription = this.form.valueChanges.subscribe(() => {
      this.emitChanges();
    });
  }

  /**
   * Emits changes
   */
  emitChanges() {
    if (this.form.valid) {
      this.valueChanges.emit({
        ...this.form.getRawValue(),
        columns: this.columns,
      });
    }
  }

  ngOnDestroy(): void {
    this.valueChangesSubscription?.unsubscribe();
  }
}
