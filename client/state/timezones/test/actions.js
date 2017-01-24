/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import {
	TIMEZONES_RECEIVE,
	TIMEZONES_REQUEST,
	TIMEZONES_REQUEST_SUCCESS
} from 'state/action-types';

import {
	timezonesRequest,
	timezonesRequestSuccess,
	timezonesReceive,
} from '../actions';

import { fromApi } from 'state/data-layer/wpcom/timezones';

/**
 * Fixture data
 */
import {
	CONTINENTS,
	LABELS_OBJECT,
	RAW_OFFSETS_OBJECT,
	TIMEZONES_DATA,
} from './fixture';

describe( 'actions', () => {
	describe( 'creators functions', () => {
		it( '#timezonesRequest()', () => {
			expect( timezonesRequest() ).to.eql( {
				type: TIMEZONES_REQUEST
			} );
		} );

		it( '#timezonesRequestSuccess()', () => {
			expect( timezonesRequestSuccess() ).to.eql( {
				type: TIMEZONES_REQUEST_SUCCESS
			} );
		} );

		it( '#timezonesReceive()', () => {
			expect( timezonesReceive( fromApi( TIMEZONES_DATA ) ) ).to.eql( {
				type: TIMEZONES_RECEIVE,
				byContinents: CONTINENTS,
				labels: LABELS_OBJECT,
				rawOffsets: RAW_OFFSETS_OBJECT,
			} );
		} );
	} );
} );
