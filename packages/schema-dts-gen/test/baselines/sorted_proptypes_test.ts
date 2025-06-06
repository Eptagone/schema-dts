/**
 * Copyright 2023 Google LLC
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

import {inlineCli} from '../helpers/main_driver.js';

test(`baseline_${basename(import.meta.url)}`, async () => {
  const {actual} = await inlineCli(
    `
<http://schema.org/a> <http://schema.org/rangeIncludes> <http://schema.org/Time> .
<http://schema.org/a> <http://schema.org/rangeIncludes> <http://schema.org/Date> .
<http://schema.org/a> <http://schema.org/rangeIncludes> <http://schema.org/Boolean> .
<http://schema.org/a> <http://schema.org/rangeIncludes> <http://schema.org/DateTime> .
<http://schema.org/a> <http://schema.org/rangeIncludes> <http://schema.org/Number> .
<http://schema.org/a> <http://schema.org/rangeIncludes> <http://schema.org/Text> .
<http://schema.org/a> <http://schema.org/domainIncludes> <http://schema.org/Thing> .
<http://schema.org/a> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/1999/02/22-rdf-syntax-ns#Property> .
<http://schema.org/Thing> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/2000/01/rdf-schema#Class> .
<http://schema.org/Text> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://schema.org/DataType> .
<http://schema.org/Text> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/2000/01/rdf-schema#Class> .
<http://schema.org/Number> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://schema.org/DataType> .
<http://schema.org/Number> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/2000/01/rdf-schema#Class> .
<http://schema.org/DateTime> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://schema.org/DataType> .
<http://schema.org/DateTime> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/2000/01/rdf-schema#Class> .
<http://schema.org/Date> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://schema.org/DataType> .
<http://schema.org/Date> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/2000/01/rdf-schema#Class> .
<http://schema.org/Boolean> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://schema.org/DataType> .
<http://schema.org/Boolean> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/2000/01/rdf-schema#Class> .
<http://schema.org/Time> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://schema.org/DataType> .
<http://schema.org/Time> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/2000/01/rdf-schema#Class> .
<http://schema.org/True> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://schema.org/Boolean> .
<http://schema.org/False> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://schema.org/Boolean> .
      `,
    ['--ontology', `https://fake.com/${basename(import.meta.url)}.nt`],
  );

  expect(actual).toMatchInlineSnapshot(`
"/** Used at the top-level node to indicate the context for the JSON-LD objects used. The context provided in this type is compatible with the keys and URLs in the rest of this generated file. */
export type WithContext<T extends Thing> = T & {
    "@context": "https://schema.org";
};
export interface Graph {
    "@context": "https://schema.org";
    "@graph": readonly Thing[];
}
type SchemaValue<T> = T | readonly T[];
type IdReference = {
    /** IRI identifying the canonical address of this object. */
    "@id": string;
};
type InputActionConstraints<T extends ActionBase> = Partial<{
    [K in Exclude<keyof T, \`@\${string}\`> as \`\${string & K}-input\`]: PropertyValueSpecification | string;
}>;
type OutputActionConstraints<T extends ActionBase> = Partial<{
    [K in Exclude<keyof T, \`@\${string}\`> as \`\${string & K}-output\`]: PropertyValueSpecification | string;
}>;
/** Provides input and output action constraints for an action. */
export type WithActionConstraints<T extends ActionBase> = T & InputActionConstraints<T> & OutputActionConstraints<T>;

export type Boolean = "http://schema.org/False" | "https://schema.org/False" | "False" | "http://schema.org/True" | "https://schema.org/True" | "True" | boolean;

export type Date = string;

export type DateTime = string;

export type Number = number | \`\${number}\`;

export type Text = string;

export type Time = string;

interface ThingBase extends Partial<IdReference> {
    "a"?: SchemaValue<Boolean | Date | DateTime | Number | Text | Time>;
}
interface ThingLeaf extends ThingBase {
    "@type": "Thing";
}
export type Thing = ThingLeaf;

"
`);
});
