import React                    from 'react';
import { createMemoryHistory }  from 'history';
import { createBrowserHistory as createHistory } from 'history'

export const history = typeof window === 'undefined'? createMemoryHistory() : createHistory();
