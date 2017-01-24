/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import { getTimezonesLabels } from '../';
import {
	RAW_OFFSETS,
	TIMEZONES_LABELS,
	TIMEZONES_BY_CONTINENT,
} from 'state/timezones/test/fixture';

describe( 'getTimezonesLabels()', () => {
	it( 'should return {} if `timezones` aren\'t synced', () => {
		const state = {
			rawOffsets: [],
			byContinent: {},
		};

		const timezonesLabels = getTimezonesLabels( state );

		expect( timezonesLabels ).to.eql( {} );
	} );

	it( 'should return timezones by contienent object data', () => {
		const state = {
			timezones: {
				rawOffsets: RAW_OFFSETS,
				byContinent: TIMEZONES_BY_CONTINENT,
				requesting: false,
			}
		};

		const labels = getTimezonesLabels( state );

		expect( labels ).to.eql( TIMEZONES_LABELS );
	} );
} );
