import { NextFunction, Request, Response } from 'express';
import { IError } from '../../interfaces/error';
import { validateHeader } from "../../middlewares/headerValidation";

describe("test for header validation",() => {

    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: NextFunction = jest.fn();

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            json: jest.fn()
        };
    });

    it("should return 406 if accept : 'application/xml' is provided",async () => {
        mockRequest = {
            headers: {
                accept : "application/xml"
            }
        }
        const expectedResponse : IError = {statusCode : 406, message : "Accept : 'application/xml' is not allowed in header"};
        validateHeader(mockRequest as Request, mockResponse as Response, nextFunction);
        expect(mockResponse.json).toBeCalledWith(expectedResponse);
        expect(nextFunction).toBeCalledTimes(0);

    });

    it("should not return any error if accept : 'application/json' is provided",() => {
        mockRequest = {
            headers: {
                accept : "application/json"
            }
        }
        validateHeader(mockRequest as Request, mockResponse as Response, nextFunction);
        expect(mockResponse.json).toBeCalledTimes(0);
        expect(nextFunction).toBeCalledTimes(1);
    });
});