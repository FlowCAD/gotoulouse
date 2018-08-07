import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { ShellComponent } from '@app/core/shell/shell.component';
import { RouteReusableStrategy } from '@app/core/route-reusable-strategy';
import { I18nService } from '@app/core/i18n.service';
import { HttpService } from '@app/core/http/http.service';
import { HttpCacheService } from '@app/core/http/http-cache.service';
import { ApiPrefixInterceptor } from '@app/core/http/api-prefix.interceptor';
import { ErrorHandlerInterceptor } from '@app/core/http/error-handler.interceptor';
import { CacheInterceptor } from '@app/core/http/cache.interceptor';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule
  ],
  declarations: [
    ShellComponent
  ],
  providers: [
    I18nService,
    HttpCacheService,
    ApiPrefixInterceptor,
    ErrorHandlerInterceptor,
    CacheInterceptor,
    {
      provide: HttpClient,
      useClass: HttpService
    },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy
    }
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }

}
