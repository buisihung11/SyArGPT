import concurrent.futures
import os
from functools import wraps

from core.utils.constants import Constants

class Common:
    @staticmethod
    def make_parallel(func):
        """
            Decorator used to decorate any function which needs to be paralleled.
            After the input of the function should be a list in which each element is
            a instance of input fot the normal function.
            You can also pass in keyword arguments separately.
            :param func: function
                The instance of the function that needs to be parallelized.
            :return: function

            Example usage:
            @make_parallel
            def func(i: int):
                print(i)
            func([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        """

        @wraps(func)
        def wrapper(lst, *args, **kwargs):
            """
            :param lst:
                The inputs of the function in a list.
            :return:
            """
            number_of_workers = Constants.NUMBER_OF_WORKERS
  
            result = []
            if number_of_workers:
                if number_of_workers == 1:
                    result = [func(i, *args, **kwargs) for i in lst]
                else:
                    with concurrent.futures.ThreadPoolExecutor(max_workers=number_of_workers) as executer:
                        bag = {executer.submit(
                            func, i, *args, **kwargs): i for i in lst}
                        for future in bag:
                            result.append(future.result())

            # remove None value
            result = [i for i in result if i]
            return result
        return wrapper

    @staticmethod
    def make_parallel_class_method(func):

        @wraps(func)
        def wrapper(self, lst, *args, **kwargs):
            """
            :param lst:
                The inputs of the function in a list.
            :return:
            """
            number_of_workers = Constants.NUMBER_OF_WORKERS
  
            result = []
            if number_of_workers:
                if number_of_workers == 1:
                    result = [func(self, lst[0], *args, **kwargs)]
                else:
                    with concurrent.futures.ThreadPoolExecutor(max_workers=number_of_workers) as executer:
                        bag = {executer.submit(
                            func, self, i, *args, **kwargs): i for i in lst}
                        for future in bag:
                            result.append(future.result())

            # remove None value
            result = [i for i in result if i]
            return result
        return wrapper

    @staticmethod
    def is_complete_html(html):
        """
            Check if the html is complete or not.
            :param html: str
                The html string.
            :return: bool
                True if the html is complete, False otherwise.
        """
        return "</html>" in html
    

    @staticmethod
    def get_domain(url):
        """
            Get the domain from the url.
            :param url: str
                The url.
            :return: str
                The domain.
        """
        return url.split("//")[-1].split("/")[0]