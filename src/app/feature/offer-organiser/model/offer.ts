export class Offer {
  id: number;
  companyName: string;
  offerName: string;
  offerLinks: string[] = [];
  applied: boolean;
  skipped: boolean;

  public linksToString(): string {
    let str = '';
    for (let i = 0; i < this.offerLinks.length - 1; i++) {
      if (i !== 0) {
        str += '\n';
      }
      str += this.offerLinks[i];
    }

    return str;
  }
}
