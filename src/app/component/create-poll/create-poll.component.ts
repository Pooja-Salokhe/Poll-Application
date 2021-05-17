import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/services/toaster.service';
import { ViewChartComponent } from '../view-chart/view-chart.component';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {

  @ViewChild(ViewChartComponent, { static: false }) viewChartComponent: ViewChartComponent;

  pollQuestionForm: FormGroup;
  createdPollQuestion: any = [];
  selectedAnswer = '';
  voteStatus = false;
  createPollStatus = false;
  constructor(private fb: FormBuilder, private toast: ToasterService) { }

  ngOnInit(): void {
    this.initializeFormControl();
  }

  /**
   * This function initialize the form control
   */
  initializeFormControl() {
    this.pollQuestionForm = this.fb.group({
      question: ['', [Validators.required, Validators.maxLength(80)]],
      options: this.fb.array([]),
    });
    this.addOption();
    this.addOption();
  }

  /**
   *  Get the control of poll question form
   */
  get formControl() {
    return this.pollQuestionForm.controls;
  }

  /**
   * This function will disable the input fields when inputs length is 80 @param event * @param type * @param index
   */
  onInputChange(event, type, index) {
    if (event.target.value.length === 80) {
      if (type === 'question') {
        (document.getElementById('question') as HTMLInputElement).disabled = true;
        (document.getElementById('editQuestion') as HTMLInputElement).style.display = 'inline';

      }
      else if (type === 'option') {
        (document.getElementById('option' + index) as HTMLInputElement).disabled = true;
        (document.getElementById('editAnswer' + index) as HTMLInputElement).style.display = 'inline';
      }

    }
    else if (event.target.value.length < 80) {
      if (type === 'question') {

        (document.getElementById('editQuestion') as HTMLInputElement).style.display = 'none';

      }
      else if (type === 'option') {
        (document.getElementById('editAnswer' + index) as HTMLInputElement).style.display = 'none';
      }

    }

  }

  /**
   * This function will enable the input fields. @param type @param index
   */
  enabledInputField(type, index) {
    if (type === 'question') {
      (document.getElementById('question') as HTMLInputElement).disabled = false;

    }
    else if (type === 'option') {
      (document.getElementById('option' + index) as HTMLInputElement).disabled = false;

    }
  }

  options(): FormArray {
    return this.pollQuestionForm.get('options') as FormArray;
  }

  newOption(): FormGroup {
    return this.fb.group({
      option: ['', [Validators.required, Validators.maxLength(80)]],
    });
  }

  /**
   * This function add more option to the question
   */
  addOption() {
    if (this.pollQuestionForm.value.options.length < 10) {
      this.options().push(this.newOption());
    }
    else {
      this.toast.showToast('Options Limit Exceeded', '', 'warning');
    }
  }

  /**
   * this function remove option @param i
   */
  removeOption(i: number) {
    if (this.pollQuestionForm.value.options.length > 2) {
      this.options().removeAt(i);
    }
    else {
      this.toast.showToast('Minimum 2 options needed', '', 'warning');
    }

  }

  /**
   * This function calculate the vote for the poll question based on selected answer.
   */
  vote() {
    this.createdPollQuestion[this.createdPollQuestion.length - 1].options.forEach(element => {
      if (element.option === this.selectedAnswer) {
        element.votes++;
      }
    });
    this.selectedAnswer = '';
    this.voteStatus = true;
    this.toast.showToast('Your vote was recorded', '', 'success');
    if (this.viewChartComponent !== undefined) {
      this.viewChartComponent.update();

    }

  }

  /**
   * This function create a poll question and ít's options.
   */
  createPoll() {
    this.createdPollQuestion.push(this.pollQuestionForm.value);

    this.createdPollQuestion[this.createdPollQuestion.length - 1].options.forEach(element => {
      element.votes = 0;
    });
    this.toast.showToast('Poll created successfully', '', 'success');
    this.createPollStatus = true;
    this.voteStatus = false;
  }

  /**
   * The function will reset poll question form , it's answer and it's UI
   */
  resetForm() {

    this.initializeFormControl();
    (document.getElementById('question') as HTMLInputElement).disabled = false;
    (document.getElementById('editQuestion') as HTMLInputElement).style.display = 'none';
    this.createPollStatus = false;
    this.voteStatus = false;
    this.selectedAnswer = '';
    this.createdPollQuestion = [];
  }
}

