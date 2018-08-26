/**
 * @author   Joseph Evans <joeevs196@gmail.com>
 * @since     26/08/2018
 * @file      The purpose of this file is to essentially implement a constructor for the
 *            ToolKit library, and a few other key componenets, it should be noted that
 *            there will be very little code within this file. This is just in place to
 *            ensure that the ToolKit library can run to a minmal amount. 
 * @copyright (c) 2018 copyright holder all Rights Reserved.
 *            Permission is hereby granted, free of charge, to any person obtaining a copy
 *            of this software and associated documentation files (the "Software"), to deal
 *            in the Software without restriction, including without limitation the rights
 *            to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *            copies of the Software, and to permit persons to whom the Software is
 *            furnished to do so, subject to the following conditions:
 *
 *            The above copyright notice and this permission notice shall be included in all
 *            copies or substantial portions of the Software.
 *
 *            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *            IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *            FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *            AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *            LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *            OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *            SOFTWARE.
 */

function ToolKit () {
  if (ToolKit.instance == null) {
    ToolKit.instance = this;
  }

  return ToolKit.instance;
}
