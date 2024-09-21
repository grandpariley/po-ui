import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { LongSurveySubmission } from '../model/model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-long-survey',
  templateUrl: './long-survey.component.html',
})
export class LongSurveyComponent {

  @Output() submit: EventEmitter<LongSurveySubmission> = new EventEmitter<LongSurveySubmission>();
  
  q3Options = [
    'Want to have a clear positive impact on the society and/or the environment with the investment',
    'Want to align investments with personal values',
    'Want to invest in products taking into account sustainability factors to increase risk adjusted return'
  ];

  q6Options = [
    'No poverty',
    'Zero hunger',
    'Good health and well-being',
    'Quality education',
    'Gender equality',
    'Clean water and sanitation',
    'Affordable and clean energy',
    'Decent work and economic growth',
    'Industry, innovation, and infrastructure',
    'Reduced inequality',
    'Sustainable cities and communities',
    'Responsible consumption and production',
    'Climate action',
    'Life below water',
    'Life on land',
    'Peace, justice and strong institutions',
  ];

  q7Options = [
    'Pesticides and biocides',
    'Animal testing',
    'Genetic engineering',
    'Palm oil',
    'Coal',
    'Oil and gas',
    'Nuclear energy',
    'Fur',
    'Factory farming',
    'Weapons and/or armament',
    'Tobacco/nicotine products',
    'Alcohol',
    'Cannabis',
    'Gambling',
    'Pornography',
    'Research on human embryos',
    'Breach of international norms',
    'Violation of the principles of the <a class="underline text-blue-600" target="_blank" rel="noopener noreferrer" href="https://unglobalcompact.org/what-is-gc/mission/principles">UN Global Compact</a>',
    'Violation of <a class="underline text-blue-600" target="_blank" rel="noopener noreferrer" href="https://mneguidelines.oecd.org/mneguidelines/">OECD guidelines for multinational enterprises</a>',
    'Violation of <a class="underline text-blue-600" target="_blank" rel="noopener noreferrer" href="https://www.ilo.org/global/standards/introduction-to-international-labour-standards/lang--en/index.htm">International Labour Organisation rules</a>',
  ];

  q8Options = [
    'Nuclear weapons',
    'Non-proliferation treaty of nuclear weapons',
    'Countries classified as <a class="underline text-blue-600" target="_blank" rel="noopener noreferrer" href="https://freedomhouse.org/explore-the-map?type=fiw">not free</a>',
    'Corruption',
    'Death sentence',
    'Wars',
    'Non-ratification of the Paris Agreement',
  ];

  get q3Form(): FormArray<FormControl<number | null>> {
    return this.formGroup.get('q3') as FormArray<FormControl<number | null>>;
  }

  get q6Form(): FormArray<FormControl<number | null>> {
    return this.formGroup.get('q6') as FormArray<FormControl<number | null>>;
  }

  get q7Form(): FormArray<FormControl<number | null>> {
    return this.formGroup.get('q7') as FormArray<FormControl<number | null>>;
  }

  get q8Form(): FormArray<FormControl<number | null>> {
    return this.formGroup.get('q8') as FormArray<FormControl<number | null>>;
  }

  get moreDetail(): boolean {
    return this.formGroup.get('q5')?.value !== 'B';
  }

  formGroup = new FormGroup({
    q2: new FormControl<string | null>(null),
    q3: new FormArray<FormControl<number | null>>(this.q3Options.map(_ => new FormControl(null))),
    q4a: new FormControl<number | null>(null),
    q4b: new FormControl<number | null>(null),
    q4c: new FormControl<number | null>(null),
    q5: new FormControl<'A' | 'B' | null>(null, Validators.required),
    q6: new FormArray<FormControl<number | null>>(this.q6Options.map(_ => new FormControl(null))),
    q7: new FormArray<FormControl<number | null>>(this.q7Options.map(_ => new FormControl(null))),
    q8: new FormArray<FormControl<number | null>>(this.q8Options.map(_ => new FormControl(null))),
    q9: new FormControl<string | null>(null),
  });

  onSubmit(): void {
    this.submit.emit({
      q2: this.formGroup.get('q2')?.value,
      q3: this.formGroup.get('q3')?.value,
      q4a: this.formGroup.get('q4a')?.value,
      q4b: this.formGroup.get('q4b')?.value,
      q4c: this.formGroup.get('q4c')?.value,
      q5: this.formGroup.get('q5')?.value,
      q6: this.formGroup.get('q6')?.value,
      q7: this.formGroup.get('q7')?.value,
      q8: this.formGroup.get('q8')?.value,
      q9: this.formGroup.get('q9')?.value
    })
  }
}
