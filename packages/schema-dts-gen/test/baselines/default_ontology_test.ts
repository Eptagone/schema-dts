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
  const {actual, actualLogs} = await inlineCli(
    `
<http://schema.org/Thing> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/2000/01/rdf-schema#Class> .
      `,
    ['--verbose'],
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

interface ThingBase extends Partial<IdReference> {
}
interface ThingLeaf extends ThingBase {
    "@type": "Thing";
}
export type Thing = ThingLeaf;

"
`);
  expect(actualLogs).toMatchInlineSnapshot(`
    "Loading Ontology from URL: https://schema.org/version/latest/schemaorg-all-https.nt
    Got Response 200: Ok.
    "
  `);
});
