// ---------------------------------------------------------------------
// COMMON ERROR HANDLING

import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

export interface SalusVitaeErrorMessage {
    message: string;
}

export interface SalusVitaeError {
    messages: SalusVitaeErrorMessage[];
    statusCode: number;
    timestamp: string;
    path: string;
    errorId: string;
    exception: string;
    severity: SalusVitaeErrorSeverity;
    type: SalusVitaeErrorType;
}

export enum SalusVitaeErrorSeverity {
    ERROR = 'ERROR',
    WARN = 'WARN'
}

export enum SalusVitaeErrorType {
    BUSINESS = 'BUSINESS',
    SYSTEM = 'SYSTEM'
}

export class Alert {
    type: string;
    message: string;
    error: SalusVitaeError;

    constructor(message: string, error: HttpErrorResponse) {
        if (error == null) {
            this.type = 'success';
            // message must be translated
            this.message = message;
        } else {
            // default type is error
            this.type = 'danger';

            // checking SalusVitaeError - Standardized errors in the backend
            this.error = error.error as SalusVitaeError;
            if (this.error.statusCode) {

                // CHANGE SEVERITY IF APPLICABLE
                if (this.error.severity === SalusVitaeErrorSeverity.WARN) {
                    this.type = 'warning';
                }

                // message
                this.message = this.error.messages[0].message +
                    this.error.messages[1].message;

                // TRID for system errors
                if (this.error.type === SalusVitaeErrorType.SYSTEM) {
                    const headers: HttpHeaders = error.headers;
                    if (headers.get('X-TRID')) {
                        this.message = this.message + ' (ID Transacao: ' + headers.get('X-TRID') + ')';
                    }
                }

            } else {
                // For Bad Request, it uses the message passed by the client
                if (error.status === 400 && message != null) {
                    this.message = message;
                } else {
                    // otherwise a predefined message
                    this.message = 'ALERT@System is unavailable. Please try it later.';
                }
            }
        }

    }

}
