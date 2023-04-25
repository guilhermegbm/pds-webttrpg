export default interface Response {
    status(httpStatus: number): Response;
    send(result: object): void;
    end(): void;
}