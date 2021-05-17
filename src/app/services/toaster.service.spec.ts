import { TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { ToasterService } from './toaster.service';

describe('ToasterService', () => {
  let service: ToasterService;

  beforeEach(() => {
    const toastrServiceStub = () => ({
      error: (message, title) => ({}),
      success: (message, title) => ({}),
      warning: (message, title) => ({}),
      info: (message, title) => ({}),
      show: (message, title) => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        ToasterService,
        { provide: ToastrService, useFactory: toastrServiceStub }
      ]
    });
    service = TestBed.inject(ToasterService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
