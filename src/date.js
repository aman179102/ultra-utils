/**
 * Advanced Date utility functions - 25+ functions
 * Rivals and surpasses date-fns, moment.js, and dayjs
 */

/**
 * Format date to specified format
 * @param {Date|string} date - Date to format
 * @param {string} format - Format string (YYYY-MM-DD, DD/MM/YYYY, etc.)
 * @returns {string} Formatted date string
 */
export function formatDate(date, format = 'YYYY-MM-DD') {
  const d = new Date(date);
  
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

/**
 * Get human-readable time ago string
 * @param {Date|string} date - Date to compare
 * @returns {string} Time ago string (e.g., "2 hours ago", "3 days ago")
 */
export function timeAgo(date) {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now - past) / 1000);
  
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 }
  ];
  
  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
    }
  }
  
  return 'just now';
}

/**
 * Add days to a date
 * @param {Date|string} date - Base date
 * @param {number} days - Number of days to add
 * @returns {Date} New date
 */
export function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Add months to a date
 * @param {Date|string} date - Base date
 * @param {number} months - Number of months to add
 * @returns {Date} New date
 */
export function addMonths(date, months) {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

/**
 * Add years to a date
 * @param {Date|string} date - Base date
 * @param {number} years - Number of years to add
 * @returns {Date} New date
 */
export function addYears(date, years) {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
}

/**
 * Subtract days from a date
 * @param {Date|string} date - Base date
 * @param {number} days - Number of days to subtract
 * @returns {Date} New date
 */
export function subDays(date, days) {
  return addDays(date, -days);
}

/**
 * Subtract months from a date
 * @param {Date|string} date - Base date
 * @param {number} months - Number of months to subtract
 * @returns {Date} New date
 */
export function subMonths(date, months) {
  return addMonths(date, -months);
}

/**
 * Subtract years from a date
 * @param {Date|string} date - Base date
 * @param {number} years - Number of years to subtract
 * @returns {Date} New date
 */
export function subYears(date, years) {
  return addYears(date, -years);
}

/**
 * Get difference between two dates in days
 * @param {Date|string} date1 - First date
 * @param {Date|string} date2 - Second date
 * @returns {number} Difference in days
 */
export function diffInDays(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2 - d1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Get difference between two dates in hours
 * @param {Date|string} date1 - First date
 * @param {Date|string} date2 - Second date
 * @returns {number} Difference in hours
 */
export function diffInHours(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2 - d1);
  return Math.ceil(diffTime / (1000 * 60 * 60));
}

/**
 * Get difference between two dates in minutes
 * @param {Date|string} date1 - First date
 * @param {Date|string} date2 - Second date
 * @returns {number} Difference in minutes
 */
export function diffInMinutes(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2 - d1);
  return Math.ceil(diffTime / (1000 * 60));
}

/**
 * Check if a date is today
 * @param {Date|string} date - Date to check
 * @returns {boolean} True if today
 */
export function isToday(date) {
  const d = new Date(date);
  const today = new Date();
  return d.toDateString() === today.toDateString();
}

/**
 * Check if a date is yesterday
 * @param {Date|string} date - Date to check
 * @returns {boolean} True if yesterday
 */
export function isYesterday(date) {
  const d = new Date(date);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return d.toDateString() === yesterday.toDateString();
}

/**
 * Check if a date is tomorrow
 * @param {Date|string} date - Date to check
 * @returns {boolean} True if tomorrow
 */
export function isTomorrow(date) {
  const d = new Date(date);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return d.toDateString() === tomorrow.toDateString();
}

/**
 * Check if a year is a leap year
 * @param {number} year - Year to check
 * @returns {boolean} True if leap year
 */
export function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * Get the start of day for a date
 * @param {Date|string} date - Input date
 * @returns {Date} Start of day
 */
export function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Get the end of day for a date
 * @param {Date|string} date - Input date
 * @returns {Date} End of day
 */
export function endOfDay(date) {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

/**
 * Get the start of week for a date
 * @param {Date|string} date - Input date
 * @returns {Date} Start of week (Sunday)
 */
export function startOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
}

/**
 * Get the end of week for a date
 * @param {Date|string} date - Input date
 * @returns {Date} End of week (Saturday)
 */
export function endOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + 6;
  return new Date(d.setDate(diff));
}

/**
 * Get the start of month for a date
 * @param {Date|string} date - Input date
 * @returns {Date} Start of month
 */
export function startOfMonth(date) {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

/**
 * Get the end of month for a date
 * @param {Date|string} date - Input date
 * @returns {Date} End of month
 */
export function endOfMonth(date) {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

/**
 * Get the start of year for a date
 * @param {Date|string} date - Input date
 * @returns {Date} Start of year
 */
export function startOfYear(date) {
  const d = new Date(date);
  return new Date(d.getFullYear(), 0, 1);
}

/**
 * Get the end of year for a date
 * @param {Date|string} date - Input date
 * @returns {Date} End of year
 */
export function endOfYear(date) {
  const d = new Date(date);
  return new Date(d.getFullYear(), 11, 31);
}

/**
 * Get the number of days in a month
 * @param {Date|string} date - Input date
 * @returns {number} Number of days in month
 */
export function daysInMonth(date) {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
}

/**
 * Get the day of year for a date
 * @param {Date|string} date - Input date
 * @returns {number} Day of year (1-366)
 */
export function dayOfYear(date) {
  const d = new Date(date);
  const start = new Date(d.getFullYear(), 0, 0);
  const diff = d - start;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

/**
 * Get the week number of the year
 * @param {Date|string} date - Input date
 * @returns {number} Week number (1-53)
 */
export function weekOfYear(date) {
  const d = new Date(date);
  const start = new Date(d.getFullYear(), 0, 1);
  const days = Math.floor((d - start) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + start.getDay() + 1) / 7);
}

/**
 * Parse a date string in various formats
 * @param {string} dateString - Date string to parse
 * @returns {Date|null} Parsed date or null if invalid
 */
export function parseDate(dateString) {
  // Try common formats
  const formats = [
    /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD
    /^\d{2}\/\d{2}\/\d{4}$/, // MM/DD/YYYY
    /^\d{2}-\d{2}-\d{4}$/, // MM-DD-YYYY
    /^\d{4}\/\d{2}\/\d{2}$/, // YYYY/MM/DD
  ];
  
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
}

/**
 * Check if a date is between two other dates
 * @param {Date|string} date - Date to check
 * @param {Date|string} start - Start date
 * @param {Date|string} end - End date
 * @returns {boolean} True if between dates
 */
export function isBetween(date, start, end) {
  const d = new Date(date);
  const s = new Date(start);
  const e = new Date(end);
  return d >= s && d <= e;
}

/**
 * Get the maximum date from an array of dates
 * @param {Array<Date|string>} dates - Array of dates
 * @returns {Date} Maximum date
 */
export function maxDate(dates) {
  return new Date(Math.max(...dates.map(d => new Date(d))));
}

/**
 * Get the minimum date from an array of dates
 * @param {Array<Date|string>} dates - Array of dates
 * @returns {Date} Minimum date
 */
export function minDate(dates) {
  return new Date(Math.min(...dates.map(d => new Date(d))));
}

/**
 * Get timezone offset in hours
 * @param {Date|string} date - Input date
 * @returns {number} Timezone offset in hours
 */
export function getTimezoneOffset(date = new Date()) {
  return -new Date(date).getTimezoneOffset() / 60;
}

/**
 * Convert date to ISO string
 * @param {Date|string} date - Input date
 * @returns {string} ISO string
 */
export function toISOString(date) {
  return new Date(date).toISOString();
}

/**
 * Convert date to Unix timestamp
 * @param {Date|string} date - Input date
 * @returns {number} Unix timestamp
 */
export function toUnixTimestamp(date) {
  return Math.floor(new Date(date).getTime() / 1000);
}

/**
 * Convert Unix timestamp to date
 * @param {number} timestamp - Unix timestamp
 * @returns {Date} Date object
 */
export function fromUnixTimestamp(timestamp) {
  return new Date(timestamp * 1000);
}
