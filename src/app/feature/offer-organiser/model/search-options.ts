export class SearchOptions {
  id: number;
  title: string;
  location: string;
  technologies: string[] = [];
  experienceLevels: string[] = [];
  websites: string[] = [];

  public toString(): string {
    if (this.id) {
      return this.title + '-' +
        this.location + '-' +
        this.technologies.toString() + '-' +
        this.experienceLevels.toString() + '-' +
        this.websites.toString();
    } else {
      return '';
    }
  }
}
