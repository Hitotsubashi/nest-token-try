import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { TokenInterceptor } from './token.interceptor';

const wikiDict = {
  spacex:
    '太空探索技术公司（英语：Space Exploration Technologies Corp.，商业名称：SpaceX）是美国一家民营航天制造商和太空运输公司，总部位于美国加利福尼亚州霍桑。SpaceX由企业家伊隆·马斯克于2002年创办，目标是降低太空运输的成本，并进行火星殖民。[8][9][10]SpaceX现开发出猎鹰系列运载火箭及龙系列飞船，用于运送荷载至地心轨道。',
  tesla:
    '特斯拉（英语：Tesla, Inc.），旧称特斯拉汽车（英语：Tesla Motors），是美国最大的电动汽车及太阳能板公司，并与Panasonic合作电池业务，产销电动汽车、车载电脑（FSD系统），太阳能板及储能设备与系统解决方案。特斯拉是世界上最早的自动驾驶汽车生产商，至2018年，特斯拉汽车已经成为世界最畅销充电式汽车公司。',
};
@UseInterceptors(TokenInterceptor)
@Controller('api/wiki')
export class WikiController {
  @Get(':keyword')
  getDetail(@Param('keyword') keyword: string) {
    return { data: wikiDict[keyword] };
  }
}
