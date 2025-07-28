import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Group } from '../../core/models';

export interface GroupState extends EntityState<Group> {
  loading: boolean;
  error: string | null;
}

export const groupAdapter: EntityAdapter<Group> = createEntityAdapter<Group>();

export const initialGroupState: GroupState = groupAdapter.getInitialState({
  loading: false,
  error: null
});