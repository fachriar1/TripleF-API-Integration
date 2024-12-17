import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import {HttpAdapterHost} from '@nestjs/core';
import errorLog from '@common/logging/error.log';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: HttpException, host: ArgumentsHost): void {
        // In certain situations `httpAdapter` might not be available in the
        // constructor method, thus we should resolve it here.
        const {httpAdapter} = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        // console.log(Object.keys(ctx.getResponse()), ctx.getResponse().next)
        const httpStatus =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;
        if (httpStatus >= 500) {
            console.log("error", exception)
            errorLog.error({message: `Error`, data: {error: `${exception}`}, request: {body: ctx.getRequest().body}})
        }
        let response: any = exception?.getResponse ? exception?.getResponse() : null
        if (response && typeof response === "object" && !response?.data?.message) {
            response.data = {}
            response.data.message = response.message
        }
        const responseBody = exception instanceof HttpException ? response : {
            statusCode: httpStatus,
            message: "Internal server error!!",
            data: {
                timestamp: new Date().toISOString(),
                path: httpAdapter.getRequestUrl(ctx.getRequest()),
                message: "Internal server error!!"
            }
        };

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}
