export class CustomTileItem {
    Id: number = 0;
    Version: number = 0;
    Type: number = 1;
    Title: String = "";
    Uri: String = "";
    Icon: Array<any> = null;
    ContentUrl: String = null;
    RequiresRefresh: Boolean = false;
    RefreshInterval: number = 1;
    ThumbnailOffsetX: number = 0;
    ThumbnailOffsetY: number = 0;
    ThumbnailScale: number = 1;
    isFieldDisabled: boolean = false;
    isExpanded: boolean = true;
}

