export interface Plex{
    event: Media | Library;
    Metadata: Metadata;
}

export interface Metadata{
    title: string;
    grandparentTitle: string;
    index: number;
}

export enum Media{
    START = 'media.play', //"media.play"
    STOP = 'media.stop',
}

export enum Library{
    NEW = 'library.new',
}