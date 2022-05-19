import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { commonclass } from 'src/app/common/common';
import { Column, PatientLists } from 'src/app/models/model';
import { ApiServicesService } from 'src/app/services/api-services.service';
import { DeletePatientDialogComponent } from './delete-patient-dialog/delete-patient-dialog.component';
import { EditPatientFormComponent } from './edit-patient-form/edit-patient-form.component';

interface SortOrder {
  sort_order: string;
  prime_table_sort_order: number;
}
@Component({
  selector: 'app-patient-information',
  templateUrl: './patient-information.component.html',
  styleUrls: ['./patient-information.component.scss'],
})
export class PatientInformationComponent implements OnInit, OnDestroy {
  patientCount = 0;
  patientDetailsList: PatientLists[] = [];
  columns: Column[] = [
    {
      field: 'patient_id',
      header: 'Patient ID',
      is_filter_enabled: true,
      is_sort_enabled: true,
    },
    {
      field: 'shared_user_id',
      header: 'Shared User ID',
      is_filter_enabled: true,
      is_sort_enabled: true,
    },
    {
      field: 'action',
      header: 'Action',
      is_filter_enabled: false,
      is_sort_enabled: false,
    },
  ];
  listLimitOptions = [10, 25, 50];
  listLimit: number = this.listLimitOptions[0];
  listFirst: number = 0;
  sortOrderOptions = [
    { sort_order: 'asc', prime_table_sort_order: 1 },
    { sort_order: 'desc', prime_table_sort_order: -1 },
  ];
  patientListParams = {
    limit: this.listLimit,
    offset: this.listFirst,
    nopaging: 0,
    sort_by: this.columns[0].field,
    search_by: '',
    search_value: '',
    sort_order: this.sortOrderOptions[0].sort_order,
  };
  isLoading = false;
  currentFilterField = '';
  currentFilterKey = '';
  resetGlobalFilter = false;
  useGlobalFilter = false;

  editDialogSubscription = new Subscription();
  deletePatientSubscription = new Subscription();

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private loader: commonclass,
    private apiServices: ApiServicesService,
    private cdf: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPatientsList();

    this.loader.showLoader('start');
    this.loader.showLoader('stop');
  }

  /**
   * Gets patients list
   * @param data
   */
  getPatientsList() {
    this.isLoading = true;
    this.apiServices
      .sendGetRequest('patient', this.patientListParams)
      .subscribe((response) => {
        this.patientCount = response.count;
        this.patientDetailsList = response.rows;
        this.isLoading = false;
      });
  }

  /**
   * Closes opened filter wrapper
   */
  private closeOpenedFilterWrapper(clearFieldValues?: Boolean) {
    const otherWrapper = document.querySelectorAll('.filter-wrapper');
    otherWrapper.forEach((x) => {
      (x as HTMLDivElement).style.display = 'none';
      if (clearFieldValues) {
        (x as HTMLDivElement).getElementsByTagName('input')[0].value = '';
      }
    });
  }

  /**
   * This method is executed to display the column wise search filter box.
   * @param event This param contains a mouse event.
   * @param wrapperSelector This param contains a combination of field name and '-input'.
   * @param columnFieldId unique identifier for the column, clicked filter field value
   * @return void Does not return anything.
   */
  showFilterBox(
    event: MouseEvent,
    wrapperSelector: string,
    columnFieldId: string
  ) {
    event.stopPropagation();
    this.closeOpenedFilterWrapper();
    const el = document.querySelector(`.${wrapperSelector}`) as HTMLDivElement;
    el.style.display = 'flex';
    // clears historic value in filter field if not current filter field
    if (this.currentFilterField !== columnFieldId) {
      el.getElementsByTagName('input')[0].value = '';
    }
  }

  /**
   * Stops propagation on filter
   * @param event
   */
  stopPropagationOnFilter(event: MouseEvent): void {
    event.stopPropagation();
  }

  /**
   * Sets search option value
   * @param searchBy
   * @param value
   */
  setSearchOptionValue(searchBy: string, value: string) {
    this.currentFilterField = searchBy;
    this.useGlobalFilter = false;
  }

  /**
   * This method is executed when filtering is done.
   * @param wrapperSelector This param contains a combination of field name and '-input'.
   * @return void Does not return anything.
   */
  onFilterDone(wrapperSelector: string) {
    const el = document.querySelector(`.${wrapperSelector}`) as HTMLDivElement;
    el.style.display = 'none';
  }

  /**
   * Goes to telemetry data page
   * @param sharedUserId
   * @param patientId
   */
  goToTelemetryData(sharedUserId: string, patientId: string) {
    this.router.navigateByUrl('telemetry-data', {
      state: { sharedUserId, patientId },
    });
  }

  /**
   * Determines whether lazy load on
   * @param event
   */
  onLazyLoad(event: any) {
    this.patientListParams.offset = event.first;
    this.patientListParams.limit = event.rows;
    this.patientListParams.sort_by = event.sortField || this.columns[0].field;

    const sortOrder = this.sortOrderOptions.find((option) => {
      return event.sortOrder === option.prime_table_sort_order;
    });
    this.patientListParams.sort_order =
      sortOrder?.sort_order || this.sortOrderOptions[0].sort_order;

    if (
      this.columns
        .map((column) => column.field)
        .includes(this.currentFilterField) &&
      !this.useGlobalFilter
    ) {
      this.patientListParams.search_by = this.currentFilterField;
      this.currentFilterKey =
        event?.filters[this.currentFilterField]?.value?.value || '';
      this.patientListParams.search_value = this.currentFilterKey;
    } else {
      this.patientListParams.search_by = this.currentFilterField;
      this.patientListParams.search_value = this.currentFilterKey;
    }

    this.getPatientsList();
  }

  /**
   * Opens edit dialog
   * @param patient
   */
  openEditDialog(patient: PatientLists) {
    const editPatientRef = this.dialog.open(EditPatientFormComponent, {
      data: patient,
    });

    this.editDialogSubscription = editPatientRef
      .afterClosed()
      .subscribe((res) => {
        if (res?.status === 'Success') {
          this.openSnackBar(res);
          this.getPatientsList();
        }

        if (res?.status === 'Failed') {
          this.openSnackBar(res);
        }
      });
  }

  /**
   * Opens delete dialog
   * @param patient
   */
  openDeleteDialog(patient: PatientLists) {
    const deletePatientRef = this.dialog.open(DeletePatientDialogComponent, {
      data: patient,
    });

    this.deletePatientSubscription = deletePatientRef
      .afterClosed()
      .subscribe((res) => {
        if (res?.status === 'Success') {
          this.openSnackBar(res);
          this.getPatientsList();
        }

        if (res?.status === 'Failed') {
          this.openSnackBar(res);
        }
      });
  }

  /**
   * Adds user response
   * @param res
   */
  addUserResponse(res: any) {
    this.getPatientsList();
    this.openSnackBar(res);
  }

  /**
   * Opens snack bar
   * @param status
   */
  openSnackBar(status: any) {
    this.snackBar.open(status.message, status.action, { duration: 3000 });
  }

  /**
   * Resets global filter component
   */
  resetGlobalFilterComponent() {
    this.resetGlobalFilter = true;
    this.cdf.detectChanges();
    this.resetGlobalFilter = false;
    this.cdf.detectChanges();
  }

  /**
   * Resets query params
   */
  resetQueryParams() {
    this.patientListParams = {
      limit: this.listLimit,
      offset: this.listFirst,
      nopaging: 0,
      sort_by: this.columns[0].field,
      search_by: '',
      search_value: '',
      sort_order: this.sortOrderOptions[0].sort_order,
    };
  }

  /**
   * Resets filters and the table all together
   * @param table
   */
  resetFilters(table: Table) {
    table.filters = {};
    this.currentFilterField = '';
    this.currentFilterKey = '';
    this.useGlobalFilter = false;
    this.closeOpenedFilterWrapper();
    this.resetGlobalFilterComponent();
    table.reset();
  }

  /**
   * Globals filter allow filter by any
   * @param event
   */
  globalFilter(event: any) {
    // clear all values present in their input fields
    const clearLocalFilterValues = true;
    // closes all open local filter boxes
    this.closeOpenedFilterWrapper(clearLocalFilterValues);

    // to give more priority to the global search
    this.useGlobalFilter = true;

    this.listFirst = 0;

    // Moves pagination to first page with searched
    this.patientListParams.offset = this.listFirst;
    this.patientListParams.limit = this.listLimit;

    this.currentFilterField = event.search_by;
    const globalSearchColumns = event.columns.filter((column: any) => {
      return column?.is_filter_enabled;
    });

    if (
      globalSearchColumns
        .map((column: any) => column.field)
        .includes(this.currentFilterField)
    ) {
      this.patientListParams.search_by = this.currentFilterField;
      this.currentFilterKey = event.search_value;
      this.patientListParams.search_value = this.currentFilterKey;
    }

    this.getPatientsList();
  }

  ngOnDestroy(): void {
    this.editDialogSubscription?.unsubscribe();
    this.deletePatientSubscription?.unsubscribe();
  }
}
