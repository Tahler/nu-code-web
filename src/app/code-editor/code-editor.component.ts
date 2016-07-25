import { Component, ElementRef, forwardRef, Input, OnInit, Output, NgZone, Provider, ViewChild, ViewEncapsulation } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { fromTextArea, Editor, EditorConfiguration } from 'codemirror';
import { LanguageDropdownComponent } from './language-dropdown';
import { Submission } from '../shared';

const CharacterLimit = 10000;

@Component({
  moduleId: module.id,
  selector: 'app-code-editor',
  templateUrl: 'code-editor.component.html',
  styleUrls: [
    // TODO: find out how this can be restricted here only (also change encapsulation)
    // '/vendor/codemirror/lib/codemirror.css',
    'code-editor.component.css'
  ],
  encapsulation: ViewEncapsulation.None,
  directives: [LanguageDropdownComponent]
})
export class CodeEditorComponent implements OnInit {
  @Input() submission: Submission = {
        lang: 'c',
        src: '',
        problem: ''
      };
  @ViewChild('textarea') textarea: ElementRef;
  private editor: Editor;

  ngOnInit() {
    // let startingMode = 'text/x-csrc';
    let options: EditorConfiguration = {
      autofocus: true,
      lineNumbers: true,
      lineWrapping: true
    };
    this.editor = fromTextArea(this.textarea.nativeElement, options);
    this.editor.on('change', editor => this.submission.src = editor.getValue());
  }

  onLangChange(langId: string): void {
    if (this.submission) {
      this.submission.lang = langId;
    }
    // this.editor.setOption('mode', langId);
  }

  private charCountDisplay() {
    return `${this.submission ? this.submission.src.length : 0}/${CharacterLimit}`;
  };

  numChars() {
    return this.editor.getValue().length;
  }
}
