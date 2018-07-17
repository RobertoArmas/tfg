import { Component, OnInit, Input } from '@angular/core';
import { HeadingText } from '../HeadingText';

@Component({
  selector: 'app-chunk-heading-text',
  templateUrl: './chunk-heading-text.component.html',
  styleUrls: ['./chunk-heading-text.component.css']
})
export class ChunkHeadingTextComponent implements OnInit {
  @Input() attributes: HeadingText;

  constructor() {
    this.attributes = new HeadingText();
  }

  ngOnInit() {
    // tslint:disable:max-line-length
    if (this.attributes.headingData === undefined) { this.attributes.headingData = 'Combined title and paragraph'; }
    if (this.attributes.textData === undefined) { this.attributes.textData = 'Proin consectetur at dui in semper. Nam molestie sit amet urna ut eleifend. In congue sapien erat, non congue dolor mattis sit amet. Suspendisse potenti. Mauris sed tempor lectus. Nullam gravida urna mattis erat sollicitudin, et lacinia ipsum porttitor. Nullam id eros ultricies, eleifend metus at, hendrerit massa.'; }
    if (this.attributes.paddingTop === undefined) { this.attributes.paddingTop = 30; }
    if (this.attributes.paddingBottom === undefined) { this.attributes.paddingBottom = 0; }
    if (this.attributes.backgroundColor === undefined) { this.attributes.backgroundColor = '#ffffff'; }
  }

  getHeadingAttributes() {
    return {
      data: this.attributes.headingData
    };
  }

  getTextAttributes() {
    return {
      data: this.attributes.textData,
      paddingTop: 0,
      paddingBottom: 0
    };
  }

}
