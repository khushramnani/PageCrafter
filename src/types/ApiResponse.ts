class ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data?: any;
  errors?: string[];

  constructor(
    statusCode:number,
    message: string = "Request successful",
    data: any = "",
    success: boolean = true,
    errors?: string[]
  ) {
    this.statusCode = statusCode;
    this.success = success;
    this.message = message;
    this.data = data;
    if (errors) {
      this.errors = errors;
    }
  }
}

export { ApiResponse };
