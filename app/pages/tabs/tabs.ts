import {Component} from '@angular/core'
import {AboutPage} from '../about/about';
import {TestsPage} from '../tests/tests';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;

  constructor() {
    this.tab1Root = TestsPage;
    this.tab2Root = AboutPage;
  }
}
