export default interface SocketOn {
    getId(): string;
    getBroadcastId(data: any): string;
    process(data: any): Promise<any>;
}
