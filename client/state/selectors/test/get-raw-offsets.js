/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import { getRawOffsets } from '../';
import {
	RAW_OFFSETS,
	TIMEZONES_BY_CONTINENT,
} from 'state/timezones/test/fixture';

describe( 'getRawOffsets()', () => {
	it( 'should return null if `timezones` aren\'t synced', () => {
		const state = {
			timezones: {
				rawOffsets: [],
				byContinent: {},
				requesting: null
			}
		};

		const manualUTCOffsets = getRawOffsets( state );

		expect( manualUTCOffsets ).to.eql( [] );
	} );

	it( 'should return raw offsets data', () => {
		const state = {
			timezones: {
				rawOffsets: RAW_OFFSETS,
				byContinent: TIMEZONES_BY_CONTINENT,
				requesting: false,
			}
		};

		const offsets = getRawOffsets( state );

		expect( offsets ).to.eql( RAW_OFFSETS );
	} );
} );
