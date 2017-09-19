import styled, { css, } from "styled-components";

import * as vars from "../vars";
import { objMap, } from "../../../lib/util";

// --------------------------------------------------

export const bp = objMap(vars.bps, (key, val) => ({
	min: (...cont) => css`
		@media (min-width: ${val.min}px) {
			${css(...cont)}
		}
	`,
	max: (...cont) => css`
		@media (max-width: ${val.max}px) {
			${css(...cont)}
		}
	`,
	only: (...cont) => css`
		@media (min-width: ${val.min}px) and (max-width: ${val.max}px) {
			${css(...cont)}
		}
	`,
}));

Object.assign(bp, {
	min: px => (...cont) => css`
		@media (min-width: ${px}px) {
			${css(...cont)}
		}
	`,
	max: px => (...cont) => css`
		@media (max-width: ${px}px) {
			${css(...cont)}
		}
	`,
	only: (min, max) => (...cont) => css`
		@media (min-width: ${min}px) and (max-width: ${max}px) {
			${css(...cont)}
		}
	`,
});

export const xs = bp.xs.only;
export const sm = bp.sm.only;
export const md = bp.md.only;
export const lg = bp.lg.only;

export const bpEach = (prop, vals) => css`
	${ Object.keys(vals).map(key => bp[key].only`${prop}: ${vals[key]};`)}
`;

export const bpEither = (prop, vals) => css`
	${ xs`${prop}: ${vals.xs};`}
	${ bp.sm.min`${prop}: ${vals.other};`}
`;
