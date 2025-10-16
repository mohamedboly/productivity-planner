import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FeatureCardList } from './homepage-feature-card-list.interface';

@Component({
  selector: 'app-home-page-feature-card-list',
  imports: [NgClass],
  templateUrl: './home-page-feature-card-list.dumb.component.html',
  styleUrl: './home-page-feature-card-list.dumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageFeatureCardListDumbComponent {
  readonly featureCardList = input.required<FeatureCardList>();
}
