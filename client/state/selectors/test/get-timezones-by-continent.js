/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import { getTimezonesByContinent } from '../';
import {
	RAW_OFFSETS,
	TIMEZONES_BY_CONTINENT
} from 'state/timezones/test/fixture';

describe( 'getTimezonesByContinent()', () => {
	it( 'should return null if `timezones` aren\'t synced', () => {
		const state = {
			timezones: {
				rawOffsets: [],
				byContinent: {}
			}
		};

		const manualUTCOffsets = getTimezonesByContinent( state );

		expect( manualUTCOffsets ).to.eql( {} );
	} );

	it( 'should return timezones by contienent object data', () => {
		const state = {
			timezones: {
				rawOffsets: RAW_OFFSETS,
				byContinent: TIMEZONES_BY_CONTINENT,
				requesting: false,
			}
		};

		const timezonesByContinent = getTimezonesByContinent( state );

		expect( timezonesByContinent ).to.eql( TIMEZONES_BY_CONTINENT );
	} );
} );
