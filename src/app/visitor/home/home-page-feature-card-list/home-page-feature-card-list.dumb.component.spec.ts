import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HomePageFeatureCardListDumbComponent } from './home-page-feature-card-list.dumb.component';
import { FeatureCardList } from './homepage-feature-card-list.interface';

describe('HomepageFeatureCardListDumbComponent', () => {
  let component: HomePageFeatureCardListDumbComponent;
  let fixture: ComponentFixture<HomePageFeatureCardListDumbComponent>;
  let cardList: DebugElement[];
  let cardTitleList: DebugElement[];

  const featureCardList: FeatureCardList = [
    { name: 'Feature 1', description: 'Description 1', icon: 'star' },
    { name: 'Feature 2', description: 'Description 2', icon: 'heart' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageFeatureCardListDumbComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageFeatureCardListDumbComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('featureCardList', featureCardList);
    fixture.detectChanges();
  });

  beforeEach(() => {
    cardList = fixture.debugElement.queryAll(By.css('[data-testid="feature-card"]'));
    cardTitleList = fixture.debugElement.queryAll(By.css('[data-testid="feature-card-title"]'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct number of feature cards', () => {
    expect(cardList.length).toBe(2);
  });

  it('should display nothing if feature list is empty', () => {
    fixture.componentRef.setInput('featureCardList', []);
    fixture.detectChanges();
    cardList = fixture.debugElement.queryAll(By.css('[data-testid="feature-card"]'));
    expect(cardList.length).toBe(0);
  });

  it('should display correct titles in each card', () => {
    cardTitleList.forEach((title, index) => {
      expect(title.nativeElement.textContent).toContain(featureCardList[index].name);
    });
  });
});
