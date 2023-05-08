export default interface Request {
    getParams(): any;
    getBody(): any;
    getHeader(key: string): any
}