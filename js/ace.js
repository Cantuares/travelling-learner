var Ace = {
  mode: 'html',
  theme: 'monokai',
  editor: ace.edit('editor'),
  start: function () {
    var self = this;
    self.editor.setTheme('ace/theme/' + self.theme);
    self.editor.session.setMode('ace/mode/' + self.mode);
    //self.editor.session.on('change', self._onChange.bind(self));
  },
  _onChange: function() {
    var self = this;
    editorView().html(self.editor.getValue());
    Tests.run();
    var nextBtn = $('.next');
    if (Tests.isValid() && Classroom.haveWeNextLesson()) {
      nextBtn.show();
    } else {
      nextBtn.hide();
    }
  }
};