import React, { Conponent, Component } from 'react';
import Remarkable from '../pages/remarkable';
var plugin = require('remarkable-katex');
var hljs = require('highlight.js');

export default class MarkdownBlock extends Component {
    rawMarkup(){
        var md = new Remarkable({
          html:         false,        // Enable html tags in source
          xhtmlOut:     false,        // Use '/' to close single tags (<br />)
          breaks:       false,        // Convert '\n' in paragraphs into <br>
          langPrefix:   'language-',  // CSS language prefix for fenced blocks
          linkify:      false,        // Autoconvert url-like texts to links
          typographer:  false,        // Enable smartypants and other sweet transforms
          // Highlighter function. Should return escaped html,
          // or '' if input not changed
          highlight: function (/*str, , lang*/) { return ''; }
        });
        md.use(plugin);
        try {
            rawMarkup = md.render(this.props.content);
            return {__html: rawMarkup};
        } catch(e) {
            return {__html: '<div>' + '无法解析' + '</div>'}
        }
    }

    render() {
        return (
            <div style={{marginBottom: -10}} dangerouslySetInnerHTML={this.rawMarkup()} />
        )
    }
}