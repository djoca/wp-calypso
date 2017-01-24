/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import { getTimezones } from '../';
import {
	CONTINENTS,
	LABELS_OBJECT,
	RAW_OFFSETS_OBJECT,
	TIMEZONES_ARRAY,
} from 'state/timezones/test/fixture';

describe( 'getTimezones()', () => {
	it( 'should return [] if `timezones` aren\'t synced', () => {
		const state = {
			timezones: {
				byContinents: [],
				labels: {},
				rawOffsets: {},
				requesting: false,
			}
		};

		const timezones = getTimezones( state, 'Atlantic' );
		expect( timezones ).to.eql( [] );
	} );

	it( 'should return timezones by contienent object data', () => {
		const state = {
			timezones: {
				byContinents: CONTINENTS,
				labels: LABELS_OBJECT,
				rawOffsets: RAW_OFFSETS_OBJECT,
				requesting: false,
			}
		};

		const timezones = getTimezones( state );
		expect( timezones ).to.eql( TIMEZONES_ARRAY );
	} );
} );
