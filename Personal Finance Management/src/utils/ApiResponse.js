 class ApiResponse {
    constructor(statusCode,data,message){
        this.message=message;
        this.data=data;
        this.statusCode=statusCode;

    }
 }
 export {ApiResponse}