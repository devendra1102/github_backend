describe("tests for checking functionality of getRepos function", () => {

    // let mockRequest: Partial<Request>;
    // let mockResponse: Partial<Response>;
    // let nextFunction: NextFunction = jest.fn();
    

    // beforeEach(() => {
    //     mockRequest = {};
    //     mockResponse = {
    //         json: jest.fn()
    //     };
    // });

    // it("should return error if invalid userid is provided",async () => {
    //     //Arrange
    //     mockRequest= {
    //         params: {
    //             userid : "somefakeuserid"
    //         }
    //     };
    //     const expectedError : {statusCode : number, message : string} = {  statusCode : 404, message : "Request failed with status code 404"}
    //     jest
    //       .spyOn(axios, "get")
    //       .mockImplementation(() => Promise.reject({ response : { status : 404}, message : "Request failed with status code 404"}));
        
    //     //Action
    //     await repoController.getRepos(mockRequest as Request, mockResponse as Response, nextFunction);  

    //     //Verify
    //     expect(axios.get).toHaveBeenCalledTimes(1);        
    //     expect(mockResponse.json).toBeCalledWith(expectedError);         

    // });

    // it("should return valid response if valid userid is provided", async () => {
    //     //Arrange
    //     mockRequest= {
    //         params: {
    //             userid : "someValidId"
    //         }
    //     };
    //     const expectedResponse = [{
    //         "repoName": "any",
    //         "ownerLogin": "any",
    //         "branches": [
    //             {
    //                 "branchName": "any",
    //                 "lastCommit": "any"
    //             },
    //             {
    //                 "branchName": "any2",
    //                 "lastCommit": "any2"
    //             }
    //         ]
    //     }];
    //     jest
    //       .spyOn(axios, "get")
    //       .mockImplementationOnce(() => Promise.resolve({ data : [{ 
    //             fork : false,
    //             name : "any",
    //             owner : 
    //             { 
    //                 login : "any"
    //             }
    //         }]
    //         , status : 200}))
    //         .mockImplementation(() => Promise.resolve({
    //             data : [{
    //                 name : "any",
    //                 commit : {
    //                     sha : "any"
    //                 }
                    
    //             },
    //             {
    //                 name : "any2",
    //                 commit : {
    //                     sha : "any2"
    //                 }
    //             }]
    //         }));

    //     //Action
    //     await repoController.getRepos(mockRequest as Request, mockResponse as Response, nextFunction);  

    //     //Verify
    //     expect(axios.get).toHaveBeenCalled();        
    //     expect(mockResponse.json).toBeCalledWith(expectedResponse);  
    // });
});

describe("checking the functionality of getBranches function", () => {

});