export function getValidationError(errorName: string, params: any) {
  switch (errorName) {
      case 'required':
          return 'You must enter a value';
      case 'largerThanField':
          return `Field should be larger than '${params.field}'`;
      case 'lessThanField':
          return `Field should be less than '${params.field}'`;
      default: return ''
  }
}
