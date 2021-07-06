export class HeaderContent {
  public title: string;
  public subtitle: string;

  public constructor(titleText: string, subTitleText = "") {
    this.title = titleText;
    this.subtitle = subTitleText;
  }
}