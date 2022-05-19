import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Formats time stamp with ISO 8601 format(YYYY-MM-DD, HH:MM)
 * @author  Gautam Balamurali
 * @since   2021-08-05
 */

@Pipe({
  name: 'formatDate',
})
export class FormatDatePipe implements PipeTransform {
  transform(value: string | number | Date, ...args: unknown[]): unknown {
    return formatDate(new Date(value), 'yyyy-MM-dd, HH:mm:ss', 'en-US');
  }
}
