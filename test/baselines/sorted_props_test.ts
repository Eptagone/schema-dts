/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @fileoverview Baseline tests are a set of tests (in tests/baseline/) that
 * correspond to full comparisons of a generate .ts output based on a set of
 * Triples representing an entire ontology.
 */
import {basename} from 'path';

import {inlineCli} from '../helpers/main_driver';

test(`baseine_${basename(__filename)}`, async () => {
  const {actual} = await inlineCli(
      `
<http://schema.org/b> <http://schema.org/rangeIncludes> <http://schema.org/Text> .
<http://schema.org/b> <http://schema.org/domainIncludes> <http://schema.org/Thing> .
<http://schema.org/b> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/1999/02/22-rdf-syntax-ns#Property> .
<http://schema.org/a> <http://schema.org/rangeIncludes> <http://schema.org/Text> .
<http://schema.org/a> <http://schema.org/domainIncludes> <http://schema.org/Thing> .
<http://schema.org/a> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/1999/02/22-rdf-syntax-ns#Property> .
<http://schema.org/c> <http://schema.org/rangeIncludes> <http://schema.org/Text> .
<http://schema.org/c> <http://schema.org/domainIncludes> <http://schema.org/Thing> .
<http://schema.org/c> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/1999/02/22-rdf-syntax-ns#Property> .
<http://schema.org/d> <http://schema.org/rangeIncludes> <http://schema.org/Text> .
<http://schema.org/d> <http://schema.org/domainIncludes> <http://schema.org/Thing> .
<http://schema.org/d> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/1999/02/22-rdf-syntax-ns#Property> .
<http://schema.org/Thing> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/2000/01/rdf-schema#Class> .
      `,
      ['--ontology', `https://fake.com/${basename(__filename)}.nt`]);

  expect(actual).toMatchInlineSnapshot(`
    "// tslint:disable

    /** Used at the top-level node to indicate the context for the JSON-LD objects used. The context provided in this type is compatible with the keys and URLs in the rest of this generated file. */
    export type WithContext<T extends Thing> = T & {
        \\"@context\\": \\"https://schema.org\\";
    };

    /** Boolean: True or False. */
    export type Boolean = true | false | \\"https://schema.org/True\\" | \\"https://schema.org/False\\";
    export const Boolean = {
        True: (\\"https://schema.org/True\\" as const),
        False: (\\"https://schema.org/False\\" as const)
    };

    /** A date value in {@link http://en.wikipedia.org/wiki/ISO_8601 ISO 8601 date format}. */
    export type Date = string;

    /** A combination of date and time of day in the form [-]CCYY-MM-DDThh:mm:ss[Z|(+|-)hh:mm] (see Chapter 5.4 of ISO 8601). */
    export type DateTime = string;

    /** Data type: Number. */
    export type Number = number;

    /** Data type: Text. */
    export type Text = string;

    /** DateTime represented in string, e.g. 2017-01-04T17:10:00-05:00. */
    export type Time = string;

    /** The basic data types such as Integers, Strings, etc. */
    export type DataType = Text | Number | Time | Date | DateTime | Boolean;

    type ThingBase = {
        /** IRI identifying the canonical address of this object. */
        \\"@id\\"?: string;
        \\"a\\"?: Text | readonly Text[];
        \\"b\\"?: Text | readonly Text[];
        \\"c\\"?: Text | readonly Text[];
        \\"d\\"?: Text | readonly Text[];
    };
    export type Thing = {
        \\"@type\\": \\"Thing\\";
    } & ThingBase;

    "
  `);
});
