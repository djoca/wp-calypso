/**
 * External dependencies
 */
import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

/**
 * Internal dependencies
 */
import { useSandbox } from 'test/helpers/use-sinon';

import timezonesReducer, {
	byContinentsReducer,
	labelsReducer,
	rawOffsetReducer,
	requesting as requestingReducer,
} from '../reducer';

import {
	timezonesReceive,
	timezonesRequest,
	timezonesRequestSuccess,
	timezonesRequestFailure,
} from '../actions';
import { fromApi } from 'state/data-layer/wpcom/timezones';

/**
 * Fixture data
 */
import {
	RAW_OFFSETS,
	TIMEZONES,
	TIMEZONES_BY_CONTINENT,
} from './fixture';

describe( 'reducer', () => {
	let sandbox;

	useSandbox( newSandbox => {
		sandbox = newSandbox;
		sandbox.stub( console, 'warn' );
	} );

	it( 'should export expected reducer keys', () => {
		expect( timezonesReducer( undefined, {} ) ).to.have.keys( [
			'byContinents',
			'labels',
			'rawOffsets',
			'requesting',
		] );
	} );

	describe( '#rawOffsetReducer()', () => {
		it( 'should default to an empty Object', () => {
			expect( rawOffsetReducer( undefined, {} ) ).to.eql( {} );
		} );

		it( 'should index timezones.rawOffsets state', () => {
			const initialState = undefined;
			const restAPIResponse = {
				manual_utc_offsets: RAW_OFFSETS,
				timezones: TIMEZONES,
				timezones_by_continent: TIMEZONES_BY_CONTINENT,
			};

			const apiResponse = fromApi( restAPIResponse );
			const action = timezonesReceive( apiResponse );

			const expectedState = apiResponse.rawOffsets;
			const newState = rawOffsetReducer( initialState, action );
			expect( newState ).to.eql( expectedState );
		} );

		it( 'should override timezones.rawOffsets state', () => {
			const initialState = fromApi( {
				manual_utc_offsets: [
					{ value: 'foo', label: 'bar' }
				],
				timezones: TIMEZONES,
				timezones_by_continent: TIMEZONES_BY_CONTINENT,
			} ).rawOffsets;

			deepFreeze( initialState );

			const restAPIResponse = {
				manual_utc_offsets: RAW_OFFSETS,
				timezones_by_continent: TIMEZONES_BY_CONTINENT,
			};

			const apiResponse = fromApi( restAPIResponse );  // data-layer processing
			const action = timezonesReceive( apiResponse );

			const expectedState = apiResponse.rawOffsets;
			const newState = rawOffsetReducer( initialState, action );
			expect( newState ).to.eql( expectedState );
		} );

		it( 'should persist state', () => {
			const initialState = fromApi( {
				manual_utc_offsets: RAW_OFFSETS,
				timezones: TIMEZONES,
				timezones_by_continent: TIMEZONES_BY_CONTINENT,
			} );
			deepFreeze( initialState );

			const action = { type: 'SERIALIZE' };

			const expectedState = initialState;
			const newState = rawOffsetReducer( initialState, action );
			expect( newState ).to.eql( expectedState );
		} );

		it( 'should load persisted state', () => {
			const initialState = fromApi( {
				manual_utc_offsets: RAW_OFFSETS,
				timezones: TIMEZONES,
				timezones_by_continent: TIMEZONES_BY_CONTINENT,
			} ).rawOffsets;

			deepFreeze( initialState );

			const action = { type: 'DESERIALIZE' };

			const expectedState = initialState;
			const newState = rawOffsetReducer( initialState, action );
			expect( newState ).to.eql( expectedState );
		} );

		it( 'should not load invalid persisted state', () => {
			const initialState = fromApi( {
				manual_utc_offsets: [
					{ foo: 'foo', bar: 'bar' }
				],
				timezones: TIMEZONES,
				timezones_by_continent: TIMEZONES_BY_CONTINENT,
			} ).rawOffsets;

			deepFreeze( initialState );

			const action = { type: 'DESERIALIZE' };
			const newState = rawOffsetReducer( initialState, action );
			expect( newState ).to.eql( {} );
		} );
	} );

	describe( '#labels()', () => {
		it( 'should default to an empty Object', () => {
			expect( labelsReducer( undefined, {} ) ).to.eql( {} );
		} );

		it( 'should index timezones.labels state', () => {
			const initialState = undefined;
			const restAPIResponse = {
				manual_utc_offsets: RAW_OFFSETS,
				timezones: TIMEZONES,
				timezones_by_continent: TIMEZONES_BY_CONTINENT,
			};

			const apiResponse = fromApi( restAPIResponse );
			const action = timezonesReceive( apiResponse );

			const expectedState = apiResponse.labels;
			const newState = labelsReducer( initialState, action );

			expect( newState ).to.eql( expectedState );
		} );

		it( 'should override timezones.labels state', () => {
			const initialState = fromApi( {
				manual_utc_offsets: RAW_OFFSETS,
				timezones: [
					{ value: 'Pacific/Apia', label: 'Apia' },
					{ value: 'Pacific/Fiji', label: 'Fiji' },
				],
				timezones_by_continent: TIMEZONES_BY_CONTINENT,
			} ).labels;

			deepFreeze( initialState );

			const restAPIResponse = {
				manual_utc_offsets: RAW_OFFSETS,
				timezones: TIMEZONES,
				timezones_by_continent: TIMEZONES_BY_CONTINENT,
			};

			const apiResponse = fromApi( restAPIResponse );  // data-layer processing
			const action = timezonesReceive( apiResponse );

			const expectedState = apiResponse.labels;
			const newState = labelsReducer( initialState, action );
			expect( newState ).to.eql( expectedState );
		} );

		it( 'should persist state', () => {
			const initialState = fromApi( {
				manual_utc_offsets: RAW_OFFSETS,
				timezones: TIMEZONES,
				timezones_by_continent: TIMEZONES_BY_CONTINENT,
			} );
			deepFreeze( initialState );

			const action = { type: 'SERIALIZE' };

			const expectedState = initialState;
			const newState = labelsReducer( initialState, action );
			expect( newState ).to.eql( expectedState );
		} );

		it( 'should load persisted state', () => {
			const initialState = fromApi( {
				manual_utc_offsets: RAW_OFFSETS,
				timezones: TIMEZONES,
				timezones_by_continent: TIMEZONES_BY_CONTINENT,
			} ).labels;

			deepFreeze( initialState );

			const action = { type: 'DESERIALIZE' };

			const expectedState = initialState;
			const newState = labelsReducer( initialState, action );
			expect( newState ).to.eql( expectedState );
		} );

		it( 'should not load invalid persisted state', () => {
			const initialState = fromApi( {
				manual_utc_offsets: RAW_OFFSETS,
				timezones: { foo: 'foo', bar: 'bar' },
				timezones_by_continent: TIMEZONES_BY_CONTINENT,
			} ).labels;

			deepFreeze( initialState );

			const action = { type: 'DESERIALIZE' };
			const newState = labelsReducer( initialState, action );

			expect( newState ).to.eql( {} );
		} );
	} );

	describe( '#byContinents()', () => {
		it( 'should default to an empty Array', () => {
			expect( byContinentsReducer( undefined, {} ) ).to.eql( [] );
		} );

		it( 'should index timezones.byContinents state', () => {
			const initialState = undefined;
			const restAPIResponse = {
				manual_utc_offsets: RAW_OFFSETS,
				timezones: TIMEZONES,
				timezones_by_continent: TIMEZONES_BY_CONTINENT,
			};

			const apiResponse = fromApi( restAPIResponse );
			const action = timezonesReceive( apiResponse );

			const expectedState = apiResponse.byContinents;

			const newState = byContinentsReducer( initialState, action );

			expect( newState ).to.eql( expectedState );
		} );

		it( 'should override timezones.byContinents state', () => {
			const initialState = fromApi( {
				manual_utc_offsets: RAW_OFFSETS,
				timezones: TIMEZONES,
				timezones_by_continent: {
					Pacific: [
						{ value: 'Pacific/Apia', label: 'Apia' },
						{ value: 'Pacific/Fiji', label: 'Fiji' },
					],
				},
			} ).byContinents;

			deepFreeze( initialState );

			const restAPIResponse = {
				manual_utc_offsets: RAW_OFFSETS,
				timezones: TIMEZONES,
				timezones_by_continent: TIMEZONES_BY_CONTINENT,
			};

			const apiResponse = fromApi( restAPIResponse );  // data-layer processing
			const action = timezonesReceive( apiResponse );

			const expectedState = apiResponse.byContinents;
			const newState = byContinentsReducer( initialState, action );
			expect( newState ).to.eql( expectedState );
		} );

		it( 'should persist state', () => {
			const initialState = fromApi( {
				manual_utc_offsets: RAW_OFFSETS,
				timezones: TIMEZONES,
				timezones_by_continent: TIMEZONES_BY_CONTINENT,
			} );
			deepFreeze( initialState );

			const action = { type: 'SERIALIZE' };

			const expectedState = initialState;
			const newState = byContinentsReducer( initialState, action );
			expect( newState ).to.eql( expectedState );
		} );

		it( 'should load persisted state', () => {
			const initialState = fromApi( {
				manual_utc_offsets: RAW_OFFSETS,
				timezones: TIMEZONES,
				timezones_by_continent: TIMEZONES_BY_CONTINENT,
			} ).byContinents;

			deepFreeze( initialState );

			const action = { type: 'DESERIALIZE' };

			const expectedState = initialState;
			const newState = byContinentsReducer( initialState, action );
			expect( newState ).to.eql( expectedState );
		} );

		it( 'should not load invalid persisted state', () => {
			const initialState = fromApi( {
				manual_utc_offsets: RAW_OFFSETS,
				timezones: TIMEZONES,
				timezones_by_continent: {
					foo: [
						{ bar: 'bar', baz: 'baz' }
					],
				},
			} ).byContinents;

			deepFreeze( initialState );

			const action = { type: 'DESERIALIZE' };
			const newState = byContinentsReducer( initialState, action );

			expect( newState ).to.eql( [] );
		} );
	} );

	describe( '#requesting()', () => {
		it( 'should return FALSE when initial state is undefined and action is unknown', () => {
			expect( requestingReducer( undefined, {} ) ).to.eql( false );
		} );

		it( 'should return TRUE when initial state is undefined and action is REQUEST', () => {
			const initialState = undefined;
			const action = timezonesRequest();
			const expectedState = true;
			deepFreeze( expectedState );

			const newState = requestingReducer( initialState, action );

			expect( newState ).to.eql( expectedState );
		} );

		it( 'should update `requesting` state on SUCCESS', () => {
			const initialState = true;
			const action = timezonesRequestSuccess();
			const expectedState = false;

			deepFreeze( initialState );
			deepFreeze( expectedState );

			const newState = requestingReducer( initialState, action );

			expect( newState ).to.eql( expectedState );
		} );

		it( 'should update `requesting` state on FAILURE', () => {
			const initialState = true;
			const action = timezonesRequestFailure();
			const expectedState = false;

			deepFreeze( initialState );
			deepFreeze( expectedState );

			const newState = requestingReducer( initialState, action );

			expect( newState ).to.eql( expectedState );
		} );
	} );
} );
