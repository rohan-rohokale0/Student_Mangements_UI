import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonHeaderSidebarComponent } from './common-header-sidebar.component';

describe('CommonHeaderSidebarComponent', () => {
  let component: CommonHeaderSidebarComponent;
  let fixture: ComponentFixture<CommonHeaderSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonHeaderSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommonHeaderSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
