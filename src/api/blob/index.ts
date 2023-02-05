export default interface IBlobReader {
    read: (uri: string) => Promise<Blob>
}