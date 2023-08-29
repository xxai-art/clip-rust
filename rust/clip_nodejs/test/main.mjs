#!/usr/bin/env -S node --loader=@w5/jsext --trace-uncaught --expose-gc --unhandled-rejections=strict --experimental-import-meta-resolve
var ROOT, tmpl_kind_li;

import test from 'ava';

import {
  Clip,
  clsImg
} from '@w5/clip';

import glob from 'glob-promise';

import {
  readFileSync
} from 'fs';

import uridir from '@w5/uridir';

import {
  resolve,
  join,
  basename
} from 'path';

ROOT = resolve(uridir(import.meta), '../../..');

tmpl_kind_li = (prompt, ...li) => {
  var i, r;
  r = [];
  for (i of li) {
    r.push(prompt.replace('{}', i));
  }
  return r;
};

test('clip', async(t) => {
  var clip, context_length, dir, fp, i, img_feature, j, k, len, len1, oimg, otxt, p, ref, ref1, ti, txt_feature, txt_feature_li, vec, word_li, word_li_li;
  dir = join(ROOT, 'lib/model', process.env.MODEL);
  clip = Clip(dir);
  context_length = 77;
  otxt = clip.txt('onnx/Txt', context_length);
  vec = otxt.encode('a photo of cat');
  t.is(vec.raw().length, 1024);
  word_li_li = [tmpl_kind_li("a photo of {}", "cat", "rat", "dog", "man", "woman"), tmpl_kind_li("一张{}的图片", "猫", "老鼠", "狗", "男人", "女人")];
  txt_feature_li = word_li_li.map(otxt.encode.bind(otxt));
  oimg = clip.img('onnx/Img', 224);
  ref = (await glob(join(ROOT, 'lib/img/*.jpg')));
  for (fp of ref) {
    img_feature = oimg.encode("jpg", readFileSync(fp));
    console.log(basename(fp));
    for (ti = j = 0, len = txt_feature_li.length; j < len; ti = ++j) {
      txt_feature = txt_feature_li[ti];
      word_li = word_li_li[ti];
      ref1 = clsImg(txt_feature, img_feature);
      for (i = k = 0, len1 = ref1.length; k < len1; i = ++k) {
        p = ref1[i];
        p = Math.round(p * 10000);
        if (p) {
          console.log(word_li[i] + ' ' + (p / 100) + '%');
        }
      }
    }
  }
  t.pass();
});
