import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToasterService } from 'src/app/services/toaster.service';
import { FormsModule } from '@angular/forms';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreatePollComponent } from './create-poll.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('CreatePollComponent', () => {
  let component: CreatePollComponent;
  let fixture: ComponentFixture<CreatePollComponent>;

  beforeEach(() => {
    const formBuilderStub = () => ({
      group: (object: any) => ({}),
      array: (array: any) => ({})
    });
    const toasterServiceStub = () => ({
      // tslint:disable-next-line:variable-name
      showToast: (_string: any, string1: any, string2: any) => ({})
    });
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      declarations: [CreatePollComponent],
      providers: [
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: ToasterService, useFactory: toasterServiceStub }
      ]
    });
    fixture = TestBed.createComponent(CreatePollComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`createdPollQuestion has default value`, () => {
    expect(component.createdPollQuestion).toEqual([]);
  });

  it(`voteStatus has default value`, () => {
    expect(component.voteStatus).toEqual(false);
  });

  it(`createPollStatus has default value`, () => {
    expect(component.createPollStatus).toEqual(false);
  });














});
