import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDialogueComponent } from './account-dialogue.component';

describe('AccountDialogueComponent', () => {
  let component: AccountDialogueComponent;
  let fixture: ComponentFixture<AccountDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountDialogueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
