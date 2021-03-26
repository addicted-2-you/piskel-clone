export class CDrawingCanvas {
  public frameId: string;

  public layerId: string;

  constructor(frameId: string, layerId: string) {
    this.frameId = frameId;
    this.layerId = layerId;
  }
}
